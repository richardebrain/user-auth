import {TypedUseSelectorHook, useSelector ,useDispatch} from 'react-redux';

import type {AppState, AppStore, AppDispatch} from '@utils/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;