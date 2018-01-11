export interface IMenuItem {
    icon: string;
    text: string;
    onClick: any;
    subMenuItems?: IMenuItem[];
}
