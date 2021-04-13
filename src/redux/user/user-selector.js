import {createSelector} from "reselect"

const selectUser = staete => staete.user;


export const selectCurrentUser = createSelector(
    [selectUser],
    (user, cart) => user.currentUser 
)