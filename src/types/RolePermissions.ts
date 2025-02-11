import { RoleType } from './Role.type';

export const RolePermissions = {
  [RoleType.ADMIN]: [
    'CREATE_POST',
    'EDIT_POST',
    'DELETE_POST',
    'CREATE_COMMENT',
    'EDIT_COMMENT',
    'DELETE_COMMENT',
    'RATE_POST',
    'EDIT_RATING',
    'RATE_COMMENT',
    'EDIT_COMMENT_RATING',
  ],
  [RoleType.SUBSCRIBED]: [
    'CREATE_COMMENT',
    'EDIT_COMMENT',
    'RATE_POST',
    'EDIT_RATING',
    'RATE_COMMENT',
    'EDIT_COMMENT_RATING',
  ],
  PUBLIC: ['READ_POST', 'READ_COMMENT'],
};
