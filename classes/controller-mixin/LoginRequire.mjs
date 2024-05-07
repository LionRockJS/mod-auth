import { ControllerMixin, Controller } from '@lionrockjs/mvc';
import { Central } from '@lionrockjs/central';

export default class ControllerMixinLoginRequire extends ControllerMixin {
  static REJECT_LANDING = 'rejectLanding';
  static ALLOW_ROLES = 'allowRoles';

  static init(state) {
    state.set(this.REJECT_LANDING, state.get(this.REJECT_LANDING) || '/');
    state.set(this.ALLOW_ROLES, state.get(this.ALLOW_ROLES) || new Set(['admin']));
  }

  static async before(state) {
    const client = state.get(Controller.STATE_CLIENT);
    const request = state.get(Controller.STATE_REQUEST);
    const { session } = request;

    if (!session?.logged_in) {
      await client.redirect(`${state.get(this.REJECT_LANDING)}?cp=${encodeURIComponent(request.raw.url)}`);
      return;
    }

    const sessionRoles = session.roles;
    if (new Set(sessionRoles).has(Central.config.auth.rootRole)) return;

    const allowRoles = state.get(this.ALLOW_ROLES);
    if(allowRoles.has('*'))return;
    const intersection = sessionRoles.filter(it => allowRoles.has(it));

    if (!intersection.length) {
      await client.redirect(`${state.get(this.REJECT_LANDING)}?cp=${encodeURIComponent(request.raw.url)}&exit=role_mismatch`);
    }
  }
}