export class DeviceClass {
  public conected: boolean = false;
  public name: string = '';
  public type: 'desktop' | 'mobile' = 'desktop';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public userId: string, private config:any) { 
    this.name = config.name;
    
    console.log(this.config);
    
  }

  changeName(name: string) {
    this.name = name;
  }
}