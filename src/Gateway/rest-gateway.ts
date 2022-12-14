import { Injectable, Inject, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { IRestGateway } from 'src/interfaces/i-rest-gateway.interface';


@Injectable()
export class RestGateway implements IRestGateway {
    /**
     *
     */
    constructor(private http: HttpService) { }
    
    async Get(url: string): Promise<any> {
        return await this.http.get<any>(url).toPromise();
    }

    async Post(url: string, object: any): Promise<any> {
        return await this.http.post<any>(url,object,{ headers: {  'maxContentLength': Infinity, 'maxBodyLength': Infinity } }).toPromise();
    }

    async Put(url: string, object: any): Promise<any> {
        return await this.http.put<any>(url,object).toPromise();
    }

    async Delete(url: string, object: any): Promise<any> {
        return await this.http.delete<any>(url,object).toPromise();
    }

    
}