import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./jwt.interceptor";
import { FakeAuthBackendInterceptor } from "./fake-auth-backend";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // use fake backend in place of Http service for backend-less development
    { provide: HTTP_INTERCEPTORS, useClass: FakeAuthBackendInterceptor, multi: true }
];

// why this index.ts file:
// for a large Angular application, it's better to have everything modulized,  
// everthing needs to be plugin and play, we'd better not plugin and chunk everthing into app module class,
// to have dirty works in a separate barrel file, we can keep the app module class more leaner.