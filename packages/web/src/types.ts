import {
  Map,
} from 'immutable'

export type BottleState = string
export type BottleType = string

export type RouteId = string
export type DisplayName = string
export interface RouteMap extends Map<RouteId, DisplayName> { }

// eslint-disable-next-line import/prefer-default-export
export const experimentId = 'experiment'
