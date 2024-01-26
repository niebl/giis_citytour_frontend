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

export const gameWaypointProgressState = atom({
  key: 'gameWaypointProgressState',
  default: 0
})

export const gameLengthState = atom({
  key: 'gameLengthState',
  default: 0
})

export const mapViewState = atom({
  key: 'mapViewState',
  default: 'cruising' // 'cruising' | 'story' | 'debug'
})

export const backendURL = atom({
  key: 'backendURL',
  default: 'localhost:3001'
})

export const selectedStoryState = atom({
  key: 'selectedStoryState',
  default: 1
})