export default class DispatchEvent extends Event {
    data: any = undefined
    constructor(event: string, data: any) {
        super(event)
        this.data = data
    }
}