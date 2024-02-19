import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class CurrentUser implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    req.session.userId = '1234';

    const { userId } = req.session || {};

    if (userId) {
      // const user = await this.userService.findOne(userId);
      gqlContext.getContext().currentUser = userId;
    }

    return next.handle();
  }
}
