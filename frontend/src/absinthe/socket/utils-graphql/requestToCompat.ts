import {GqlRequest, GqlRequestCompat} from "./types";

/**
 * Creates a GqlRequest using given GqlRequestCompat
 *
 * @param {GqlRequest<Variables>} gqlRequest
 *
 * @return {GqlRequestCompat<Variables>}
 *
 * @example
 * const operation = `
 *   query userQuery($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       email
 *     }
 *   }
 * `;
 *
 * console.log(requestToCompat({operation, variables: {userId: 10}}));
 * // {query: "...", variables: {userId: 10}}
 */
const requestToCompat = <V>({operation: query, variables}: GqlRequest<V>): GqlRequestCompat<V> => {
  const q = query.loc!.source.body;
  return variables ? {query: q, variables} : {query: q};
};

export default requestToCompat;
