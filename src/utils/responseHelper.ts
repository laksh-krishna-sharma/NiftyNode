import type { FastifyReply } from "fastify";

export const setServerError = (rep: FastifyReply, message: string) => {
  return rep.status(500).send({
    status: "Error",
    data: {
      message,
    },
  });
};

export const setBadRequest = (rep: FastifyReply, message: string) => {
  return rep.status(400).send({
    status: "Error",
    data: {
      message,
    },
  });
};

export const setUnauthorized = (rep: FastifyReply, message: string) => {
  return rep.status(401).send({
    status: "Error",
    data: {
      message,
    },
  });
};

export const setForbidden = (rep: FastifyReply, message: string) => {
  return rep.status(403).send({
    status: "Error",
    data: {
      message,
    },
  });
};

export const setNotFound = (rep: FastifyReply, message: string) => {
  return rep.status(404).send({
    status: "Error",
    data: {
      message,
    },
  });
};

export const setSuccess = (rep: FastifyReply, data: any) => {
  return rep.code(200).send({
    status: "Success",
    data,
  });
};