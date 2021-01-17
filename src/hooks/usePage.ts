import { useRef } from "react";
import { useParams } from "react-router-dom";
export function useRouteParamId(name?: string) {
  const idRef = useRef(0);
  const params = useParams<{ id: string }>();
  if (params) {
    idRef.current = Number(params.id);
  }
  return idRef.current;
}

export function useRouteParam<T = any>(initial: any) {
  const routeParams = useRef<T>(initial);
  const params = useParams<T>();
  if (params) {
    routeParams.current = params;
  }
  return routeParams.current;
}
