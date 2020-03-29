import * as Yup from "yup";
import { validNumberNullable } from './constants'

export const MenuItemAddSchema = Yup.object().shape({
    param_choice: Yup.string().required('Required'),
    unit_choice: Yup.string().required('Required'),
});

export const TargetValueSchema = Yup.object().shape({
    target_value: validNumberNullable
});
