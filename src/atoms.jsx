import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export const userLocationState = atom({
  key: 'userLocationState', // unique ID (with respect to other atoms/selectors)
  default: [null, null], // default value (aka initial value)
});