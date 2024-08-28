import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { NullableType } from '../utils/types/nullable.type';
// import { FilterPostDto, SortPostDto } from './dto/query-post.dto';
import { PostRepository } from './infrastructure/persistence/post.repository';
import { Posts } from './domain/post';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { FilesService } from '../files/files.service';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { DeepPartial } from '../utils/types/deep-partial.type';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createProfileDto: CreatePostDto): Promise<Posts> {
    const clonedPayload = {
      provider: AuthProvidersEnum.email,
      ...createProfileDto,
    };

    // if (clonedPayload.password) {
    //   const salt = await bcrypt.genSalt();
    //   clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    // }

    // if (clonedPayload.email) {
    //   const postObject = await this.postsRepository.findByEmail(
    //     clonedPayload.email,
    //   );
    //   if (postObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: 'emailAlreadyExists',
    //       },
    //     });
    //   }
    // }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findById(
        clonedPayload.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      clonedPayload.photo = fileObject;
    }

    // if (clonedPayload.role?.id) {
    //   const roleObject = Object.values(RoleEnum)
    //     .map(String)
    //     .includes(String(clonedPayload.role.id));
    //   if (!roleObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         role: 'roleNotExists',
    //       },
    //     });
    //   }
    // }

    // if (clonedPayload.status?.id) {
    //   const statusObject = Object.values(StatusEnum)
    //     .map(String)
    //     .includes(String(clonedPayload.status.id));
    //   if (!statusObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         status: 'statusNotExists',
    //       },
    //     });
    //   }
    // }

    return this.postsRepository.create(clonedPayload);
  }

  // findManyWithPagination({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  // }: {
  //   filterOptions?: FilterPostDto | null;
  //   sortOptions?: SortPostDto[] | null;
  //   paginationOptions: IPaginationOptions;
  // }): Promise<Post[]> {
  //   return this.postsRepository.findManyWithPagination({
  //     filterOptions,
  //     sortOptions,
  //     paginationOptions,
  //   });
  // }

  findById(id: Posts['id']): Promise<NullableType<Posts>> {
    return this.postsRepository.findById(id);
  }

  // findByEmail(email: Posts['email']): Promise<NullableType<Post>> {
  //   return this.postsRepository.findByEmail(email);
  // }

  // findBySocialIdAndProvider({
  //   socialId,
  //   provider,
  // }: {
  //   socialId: Post['socialId'];
  //   provider: Post['provider'];
  // }): Promise<NullableType<Post>> {
  //   return this.postsRepository.findBySocialIdAndProvider({
  //     socialId,
  //     provider,
  //   });
  // }

  async update(
    id: Posts['id'],
    payload: DeepPartial<Posts>,
  ): Promise<Posts | null> {
    const clonedPayload = { ...payload };

    // if (
    //   clonedPayload.password &&
    //   clonedPayload.previousPassword !== clonedPayload.password
    // ) {
    //   const salt = await bcrypt.genSalt();
    //   clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    // }

    // if (clonedPayload.email) {
    //   const postObject = await this.postsRepository.findByEmail(
    //     clonedPayload.email,
    //   );

    //   if (postObject && postObject.id !== id) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: 'emailAlreadyExists',
    //       },
    //     });
    //   }
    // }

    // if (clonedPayload.photo?.id) {
    //   const fileObject = await this.filesService.findById(
    //     clonedPayload.photo.id,
    //   );
    //   if (!fileObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         photo: 'imageNotExists',
    //       },
    //     });
    //   }
    //   clonedPayload.photo = fileObject;
    // }

    // if (clonedPayload.role?.id) {
    //   const roleObject = Object.values(RoleEnum)
    //     .map(String)
    //     .includes(String(clonedPayload.role.id));
    //   if (!roleObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         role: 'roleNotExists',
    //       },
    //     });
    //   }
    // }

    // if (clonedPayload.status?.id) {
    //   const statusObject = Object.values(StatusEnum)
    //     .map(String)
    //     .includes(String(clonedPayload.status.id));
    //   if (!statusObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         status: 'statusNotExists',
    //       },
    //     });
    //   }
    // }

    return this.postsRepository.update(id, clonedPayload);
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsRepository.remove(id);
  }
}
