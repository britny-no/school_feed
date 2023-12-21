import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

// 쓸만한 rmq가 없어서 기존 amqplib로 class화
@Injectable()
export class RmqService {
  // connection, channel의 amqp connection, channel 타입을 가져오지 못해 일단은 any로 진행
  public connection: null | any = null;
  public channel: null | any = null;
  public connected: boolean = false;
  public channelConnected: boolean = false;
  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    // 초기화때 발생 에러는 그냥 꺼지게 두는게 나을듯(without try-catch)
    this.connect()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  // class 안에서만 상태값 connected, channelConnected 변경하니, isConnected와 isOpen 사용은 미룰수 있다
  async connect(): Promise<void> {
    if (this.connected) {
      throw new InternalServerErrorException('already connected');
    }

    try {
      this.connection = await amqp.connect(
        this.configService.get<string>('RMQ_URL', '23url'),
      );
      this.connected = true;
      // connect, channel에 대한 로직 잡히기 전까지  connect속 createChannel 수정
      this.createChannel();
    } catch (err) {
      this.logger.error(`rmq connect error, ${JSON.stringify(err)}`);
      throw new InternalServerErrorException('관리자에게 문의바랍니다');
    }
  }

  async createChannel(): Promise<void> {
    const errIndex = [
      this.connected,
      this.connected && !this.channelConnected,
    ].indexOf(false);

    if (errIndex === -1) {
      try {
        this.channel = await this.connection.createChannel();
        this.channelConnected = true;
      } catch (err) {
        this.logger.warn(`rmq connect error, ${JSON.stringify(err)}`);
        throw new InternalServerErrorException('관리자에게 문의바랍니다');
      }
    } else {
      switch (errIndex) {
        case 0:
          throw new InternalServerErrorException('connect first');
        case 1:
          throw new InternalServerErrorException('already channeling');
      }
    }
  }

  async sendMsg(msg: string): Promise<void> {
    const que = this.configService.get<string>('RMQ_QUE');
    console.log('quw', que);
    if (this.channelConnected && this.connected) {
      this.channel.assertQueue(que, {
        durable: false,
      });
      this.channel.sendToQueue(que, Buffer.from(msg));
    } else {
      throw new InternalServerErrorException('rmq config error');
    }
  }

  async testMethod(): Promise<string> {
    return '!23';
  }
}
