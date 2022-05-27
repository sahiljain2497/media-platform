import ChannelModel from '@/models/channel.model';

export default class ChannelService {
  public channelModel = ChannelModel;

  public async getChannels(filters: any) {
    const channels = await this.channelModel.paginate(filters);
    return channels;
  }
}
