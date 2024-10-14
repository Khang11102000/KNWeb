import { Injectable } from '@nestjs/common';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { User } from '../../../../domain/user';
import { UserRepository } from '../../user.repository';
import { UserSchemaClass } from '../entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { AddFriendDto } from 'src/users/dto/add-friend-dto';

@Injectable()
export class UsersDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
  ) { }
  async findByKeyword(keyword: string): Promise<NullableType<User[]>> {
    var regex = keyword.split(' ').map(part => new RegExp(part, 'i'));
    const userObjects = await this.usersModel.find({
      $or: [
        { firstName: { $in: regex } },
        { lastName: { $in: regex } },
      ]
    });
    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdUser = new this.usersModel(persistenceModel);
    const userObject = await createdUser.save();
    return UserMapper.toDomain(userObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FilterQuery<UserSchemaClass> = {};
    if (filterOptions?.roles?.length) {
      where['role._id'] = {
        $in: filterOptions.roles.map((role) => role.id.toString()),
      };
    }

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }
  async findAllFriendsWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, id: User['id']): Promise<User[]> {
    const user = await this.usersModel.findOne({ '_id': id })
    if (user && user.friends) {
      const friendObjects = await this.usersModel.find({ _id: { $in: user.friends } })
      // user.friends.map(async (fId) => {
      //   const friendObject = await this.usersModel.findOne({ '_id': fId })
      //   if (friendObject) {
      //     userObjects.push(friendObject)
      //   }
      // })
      return friendObjects.map((userObject) => UserMapper.toDomain(userObject));

    }
    // userObjects.sort(
    //   sortOptions?.reduce(
    //     (accumulator, sort) => ({
    //       ...accumulator,
    //       [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
    //         sort.order.toUpperCase() === 'ASC' ? 1 : -1,
    //     }),
    //     {},
    //   ),
    // )
    // .skip((paginationOptions.page - 1) * paginationOptions.limit)
    // .limit(paginationOptions.limit);
    return [];
  }
  async findAllFollowingsWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, id: User['id']): Promise<User[]> {
    const user = await this.usersModel.findOne({ '_id': id })
    if (user && user.friends) {
      const friendObjects = await this.usersModel.find({ _id: { $in: user.followings } })
      // user.friends.map(async (fId) => {
      //   const friendObject = await this.usersModel.findOne({ '_id': fId })
      //   if (friendObject) {
      //     userObjects.push(friendObject)
      //   }
      // })
      return friendObjects.map((userObject) => UserMapper.toDomain(userObject));

    }

    // userObjects.sort(
    //   sortOptions?.reduce(
    //     (accumulator, sort) => ({
    //       ...accumulator,
    //       [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
    //         sort.order.toUpperCase() === 'ASC' ? 1 : -1,
    //     }),
    //     {},
    //   ),
    // )
    // .skip((paginationOptions.page - 1) * paginationOptions.limit)
    // .limit(paginationOptions.limit);
    return [];
  }
  async findAllFollowersWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, id: User['id']): Promise<User[]> {
    const user = await this.usersModel.findOne({ '_id': id })
    if (user && user.friends) {
      const friendObjects = await this.usersModel.find({ _id: { $in: user.followers } })
      // user.friends.map(async (fId) => {
      //   const friendObject = await this.usersModel.findOne({ '_id': fId })
      //   if (friendObject) {
      //     userObjects.push(friendObject)
      //   }
      // })
      return friendObjects.map((userObject) => UserMapper.toDomain(userObject));

    }

    // userObjects.sort(
    //   sortOptions?.reduce(
    //     (accumulator, sort) => ({
    //       ...accumulator,
    //       [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
    //         sort.order.toUpperCase() === 'ASC' ? 1 : -1,
    //     }),
    //     {},
    //   ),
    // )
    // .skip((paginationOptions.page - 1) * paginationOptions.limit)
    // .limit(paginationOptions.limit);
    return [];
  }
  async findByKeywordWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }, keyword): Promise<User[]> {
    var regex = keyword.split(' ').map(part => new RegExp(part, 'i'));
    const where: FilterQuery<UserSchemaClass> = {};
    if (filterOptions?.roles?.length) {
      where['role._id'] = {
        $in: filterOptions.roles.map((role) => role.id.toString()),
      };
    }

    const userObjects = await this.usersModel
      .find({
        $or: [
          { firstName: { $in: regex } },
          { lastName: { $in: regex } },
        ]
      })
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }
  async findById(id: User['id']): Promise<NullableType<User>> {
    const userObject = await this.usersModel.findById(id);
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null;

    const userObject = await this.usersModel.findOne({ email });
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>> {
    if (!socialId || !provider) return null;

    const userObject = await this.usersModel.findOne({
      socialId,
      provider,
    });

    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const user = await this.usersModel.findOne(filter);

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      UserMapper.toPersistence({
        ...UserMapper.toDomain(user),
        ...clonedPayload,
      }),
      { new: true },
    );

    return userObject ? UserMapper.toDomain(userObject) : null;
  }
  async addFriend(addFriendDto: AddFriendDto): Promise<void> {
    switch (addFriendDto.key) {
      case 'sendFriendRequest':
        await this.usersModel.updateOne(
          { _id: addFriendDto.firstUserId },
          { "$push": { "followings": addFriendDto.secondUserId } }

        )
        await this.usersModel.updateOne(
          { _id: addFriendDto.secondUserId },
          { "$push": { "followers": addFriendDto.firstUserId } }
        )
        break;
      case 'acceptFriendRequest':
        await this.usersModel.updateOne(
          { _id: addFriendDto.firstUserId },
          { "$push": { "friends": addFriendDto.secondUserId }, "$pull": { "followings": addFriendDto.secondUserId } }
        )
        await this.usersModel.updateOne(
          { _id: addFriendDto.secondUserId },
          { "$push": { "friends": addFriendDto.firstUserId }, "$pull": { "followers": addFriendDto.secondUserId } }
        )
        break;
      case 'cancelFriendRequest':
        await this.usersModel.updateOne(
          { _id: addFriendDto.firstUserId },
          { "$pull": { "followings": addFriendDto.secondUserId } }
        )
        await this.usersModel.updateOne(
          { _id: addFriendDto.secondUserId },
          { "$pull": { "followers": addFriendDto.firstUserId } }
        )
        break;
      case 'cancelFriend':
        await this.usersModel.updateOne(
          { _id: addFriendDto.firstUserId },
          { "$pull": { "friends": addFriendDto.secondUserId } }
        )
        await this.usersModel.updateOne(
          { _id: addFriendDto.secondUserId },
          { "$pull": { "friends": addFriendDto.firstUserId } }
        )
        break;
    }
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id.toString(),
    });
  }
}
