import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class PublicGuard implements CanActivate{
     constructor() {}
     async canActivate(context: ExecutionContext){
         return true
     }
}