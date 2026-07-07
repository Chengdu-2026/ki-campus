/** Whitelist der wählbaren Themen-Keys der Leadmaschine (i18n: themen.t1 … themen.t8). */
export const LEAD_TOPIC_KEYS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"] as const;
export type LeadTopicKey = (typeof LEAD_TOPIC_KEYS)[number];
