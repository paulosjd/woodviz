import * as Yup from "yup";

export const BoardProblemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    grade: Yup.string().oneOf(['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a'], ''),
    selectedHoldXList: Yup.array().of(Yup.number()).test('selectedHoldXList', 'Min length of 1', x => x.length > 0),
    selectedHoldYList: Yup.array().of(Yup.number()).test('selectedHoldYList', 'Min length of 1', x => x.length > 0)
});