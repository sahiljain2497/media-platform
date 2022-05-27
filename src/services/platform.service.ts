import PlatformModel from '@/models/platform.model';

export default class PlatformService {
  public platformModel = PlatformModel;

  public async getPlatforms() {
    const platforms = await this.platformModel.paginate();
    return platforms;
  }
}
