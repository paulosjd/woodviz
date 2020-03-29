import * as Yup from "yup";
import { isValidDate, isNumeric, isValidBookmarkUrl } from "../utils/validation";

export const validDate = Yup.string().required('Required').test("date", "Expected format: YYYY-MM-DD",
    value => { return value && isValidDate(value) });

export const validNumber = Yup.string().required('Required').test("number", "Must be a valid number",
    value => { return value && isNumeric(value) });

export const validNumberNullable = Yup.string().nullable().test("number", "Must be a valid number",
    value => { if (value === '') return true; return value && isNumeric(value) }).default('');
