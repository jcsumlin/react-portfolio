import { z } from 'zod';

// Base user schema with common properties
const BaseUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  user_view_type: z.string().optional(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  gravatar_id: z.string().nullable(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().email().nullable(),
  notification_email: z.string().email().nullable().optional(),
  hireable: z.boolean().nullable(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Plan schema (common to both user types)
const PlanSchema = z.object({
  collaborators: z.number(),
  name: z.string(),
  space: z.number(),
  private_repos: z.number(),
});

// Private User schema with additional fields
const PrivateUserSchema = BaseUserSchema.extend({
  private_gists: z.number(),
  total_private_repos: z.number(),
  owned_private_repos: z.number(),
  disk_usage: z.number(),
  collaborators: z.number(),
  two_factor_authentication: z.boolean(),
  plan: PlanSchema.optional(),
  business_plus: z.boolean().optional(),
  ldap_dn: z.string().optional(),
});

// Public User schema (may have some additional optional fields)
const PublicUserSchema = BaseUserSchema.extend({
  plan: PlanSchema.optional(),
  private_gists: z.number().optional(),
  total_private_repos: z.number().optional(),
  owned_private_repos: z.number().optional(),
  disk_usage: z.number().optional(),
  collaborators: z.number().optional(),
});

// Union schema to handle both Private and Public users
export const GitHubUserSchema = z.union([PrivateUserSchema, PublicUserSchema]);
export type GitHubUser = z.infer<typeof GitHubUserSchema>;
