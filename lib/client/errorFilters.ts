import type {State} from '@hookstate/core';

import { ViewMode } from '../enums';
import { findIssueDepthByUrl } from '../findIssueDepthByUrl';
import { StarMapsIssueErrorsGrouped, IssueData } from '../types';

/**
 * Returns an issueError filter that will filter out any errors that are not maxDepth or shallower.
 *
 * @param {number} maxDepth - A 0-indexed number representing the maximum depth of the tree to search.
 */
export const getIssueErrorFilter = (maxDepth: number) =>
  (errors: StarMapsIssueErrorsGrouped[], issueDataState: IssueData) => {
    return errors.filter(({ issueUrl: errorIssueUrl }) => {
      if (issueDataState != null) {
        const foundIssueDepth = findIssueDepthByUrl(issueDataState, errorIssueUrl);

        if (foundIssueDepth <= maxDepth && foundIssueDepth > -1) {
          return true;
        }
      }

      return false;
    });
  }



export const errorFilters = {
  [ViewMode.Simple]: getIssueErrorFilter(1),
  [ViewMode.Detail]: getIssueErrorFilter(3),
}
