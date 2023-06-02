import { ResolveFn } from '@angular/router';

export const indexResolverResolver: ResolveFn<boolean> = (route, state) => {
  console.log('hello i am the resolver');
  return true;
};
