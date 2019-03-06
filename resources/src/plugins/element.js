/*
import {
    Row,
    Col,
    Input,
    Button,
    Form,
    FormItem,
    Table,
    TableColumn,
    Select,
    Option,
    Carousel,
    CarouselItem,
    AutoComplete,
    Pagination,
    Dialog,
    Popover,
} from 'element-ui';

const components = [
    Row,
    Col,
    Input,
    Button,
    Form,
    FormItem,
    Table,
    TableColumn,
    Select,
    Option,
    Carousel,
    CarouselItem,
    AutoComplete,
    Pagination,
    Dialog,
    Popover
]

export default {

    install(Vue){
        components.forEach(component => Vue.component(component.name, component));

    }
}
*/

import {
    Row,
    Col,
    Input,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Button,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    MessageBox,
    Message,
    Tooltip,
    Select,
    Option,
    Upload,
    Menu,
    MenuItem,
    //SubMenu,
    TabPane,
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    Switch,
    Radio,
    RadioGroup,
    Popover
} from 'element-ui';

const components = [
    Row,
    Col,
    Input,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Button,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    Tooltip,
    Select,
    Option,
    Upload,
    Menu,
    MenuItem,
    //SubMenu,
    Submenu,
    Tabs,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    TabPane,
    Switch,
    Radio,
    RadioGroup,
    Popover
];

const _MessageBox = MessageBox;
const _Message = Message;

export default {

    install(Vue, options){
        components.forEach(component => Vue.component(component.name, component));
        Vue.prototype.$msgbox = _MessageBox;
        Vue.prototype.$message = _Message;

    }
}
