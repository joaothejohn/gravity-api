export default {
  NewUserPlan: {
    type: "object",
    properties: {
      name: {
        type: "string",
        nullable: true,
      },
      maxLimit: {
        type: "string",
        nullable: true,
      },
      limitAt: {
        type: "string",
        nullable: true,
      },
      priority: {
        type: "string",
        nullable: true,
      },
      burstLimit: {
        type: "string",
        nullable: true,
      },
      burstThreshold: {
        type: "string",
        nullable: true,
      },
      burstTime: {
        type: "string",
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  NewUserRadius: {
    type: "object",
    properties: {
      username: {
        type: "string",
        nullable: true,
      },
      password: {
        type: "string",
        nullable: true,
      },
      ip: {
        type: "string",
        nullable: true,
      },
      planId: {
        type: "string",
        nullable: true,
      },
    },
    additionalProperties: false,
  },
};
