/**
 * `reduxHooks.ts` — кастомные хуки для использования Redux с TypeScript.
 *
 * Этот файл содержит два хука:
 * 1. `useAppDispatch` — типизированный `dispatch` для работы с Redux.
 * 2. `useAppSelector` — типизированный `useSelector` для получения данных из `store`.
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

/**
 * `useAppDispatch` — кастомный хук для использования `dispatch` с типами `AppDispatch`.
 * Позволяет безопасно использовать Redux `dispatch` в TypeScript-приложении.
 *
 * @returns {AppDispatch} Типизированная функция `dispatch`
 *
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(someAction());
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * `useAppSelector` — типизированный `useSelector`, обеспечивающий безопасную работу с `RootState`.
 * Позволяет получать данные из `store` с полной поддержкой TypeScript.
 *
 * @type {TypedUseSelectorHook<RootState>}
 *
 * @example
 * const someData = useAppSelector(state => state.someReducer.someData);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
