import { map } from "rxjs/operators";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "objectList",
})
export class objectList implements PipeTransform {
  transform(input: any[], ...keys: any): any {

    let list = "";
    console.time()
    for (let item = 0; item < input.length; item++) {
      for (let key of keys) {
        list = list.concat(input[item]?.[key], " ");
      }

      if (input.length-1 == item) {
        continue;
      } else {
        if (input.length-1 != item) list = list.concat(",");
      }

    }
    return list;
  }
}
