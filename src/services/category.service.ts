import CategoryModel from '@/models/category.model';

export default class CategoryService {
  public categoryModel = CategoryModel;

  public async getCategories(filter: any) {
    const categories = await this.categoryModel.paginate(filter);
    return categories;
  }
}
