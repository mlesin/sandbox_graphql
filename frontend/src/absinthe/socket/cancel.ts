import notifierCancel from "./notifier/cancel";
import notifierFlushCanceled from "./notifier/flushCanceled";
import notifierRefresh from "./notifier/refresh";
import notifierRemove from "./notifier/remove";
import refreshNotifier from "./refreshNotifier";
import requestStatuses from "./notifier/requestStatuses";
import updateNotifiers from "./updateNotifiers";
import {unsubscribe} from "./subscription";

import {AbsintheSocket} from "./types";
import {Notifier} from "./notifier/types";

const cancelQueryOrMutationSending = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  updateNotifiers(absintheSocket, notifierRefresh(notifierFlushCanceled(notifierCancel(notifier))));

const cancelQueryOrMutationIfSending = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  notifier.requestStatus === requestStatuses.sending ? cancelQueryOrMutationSending(absintheSocket, notifier) : absintheSocket;

const cancelPending = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  updateNotifiers(absintheSocket, notifierRemove(notifierFlushCanceled(notifierCancel(notifier))));

const cancelQueryOrMutation = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  notifier.requestStatus === requestStatuses.pending
    ? cancelPending(absintheSocket, notifier)
    : cancelQueryOrMutationIfSending(absintheSocket, notifier);

const unsubscribeIfNeeded = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  notifier.requestStatus === requestStatuses.sent ? unsubscribe(absintheSocket, notifier) : absintheSocket;

const cancelNonPendingSubscription = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  unsubscribeIfNeeded(absintheSocket, refreshNotifier(absintheSocket, notifierCancel(notifier)));

const cancelSubscription = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  notifier.requestStatus === requestStatuses.pending
    ? cancelPending(absintheSocket, notifier)
    : cancelNonPendingSubscription(absintheSocket, notifier);

const cancelActive = (absintheSocket: AbsintheSocket, notifier: Notifier) =>
  notifier.operationType === "subscription"
    ? cancelSubscription(absintheSocket, notifier)
    : cancelQueryOrMutation(absintheSocket, notifier);

/** : AbsintheSocket
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.cancel(absintheSocket, notifier);
 */
const cancel = (absintheSocket: AbsintheSocket, notifier: Notifier): AbsintheSocket =>
  notifier.isActive ? cancelActive(absintheSocket, notifier) : absintheSocket;

export default cancel;
