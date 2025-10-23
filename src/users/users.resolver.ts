import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../shared/dto/user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(
    @Args('limit', { type: () => Int, nullable: true }) limit = 10,
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
  ) {
    return this.usersService.findAll({ limit, skip });
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }
}