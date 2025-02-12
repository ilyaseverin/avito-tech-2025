import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

/**
 * Хук для получения типизированного dispatch.
 * Вместо обычного `useDispatch` используем `useAppDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Хук для типизированного useSelector.
 * Вместо обычного `useSelector` используем `useAppSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
