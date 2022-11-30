import { Request, Response } from "express";

export interface ICustomError {
  constrains: string;
  property: string;
}

export interface IContext {
  connectionParams?: { authorization: string; [key: string]: string };
  req?: Request;
  res?: Response;
  payload?: { id: string };
}

export interface IPagination<T> {
  results: T[];
  info: {
    total: number;
    page: number;
    pages: number;
  };
}
