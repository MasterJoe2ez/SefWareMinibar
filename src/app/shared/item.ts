export class Item {
  $key?: string | null | undefined;
  id?: string | null | undefined;
  name?: string | null | undefined;
  amount?: number | null | undefined;
  cost?: number | null | undefined;
  sell?: number | null | undefined;

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
