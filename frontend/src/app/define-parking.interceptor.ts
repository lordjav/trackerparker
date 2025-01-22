import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const defineParkingInterceptor: HttpInterceptorFn = (req, next, ) => {
  return next(req)/*.pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 201) {
          /*this.snackBar.open(
            `Vehículo ${event.body!.plate} ingresado exitosamente`, 
            "Ok", 
            {duration: 5000}
          )
      } else if (event.status === 200) {
          console.error('Parking request failed');
        }
      }
    })
  );*/
};
