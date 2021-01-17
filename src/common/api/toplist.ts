import request from "./request";
import { AllToplist } from "src/types";
export function getAllTopList() {
  return request<AllToplist>("/toplist", "get");
}
