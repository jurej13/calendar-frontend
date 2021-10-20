export const types = {
    //tipos dela ui, para abrir y cerrar el modal.
    uiOpenModal : '[ui] Open modal',
    uiCloseModal : '[ui] Close modal',
    //eventos
    eventSetActive: '[event] Set Active',
    eventLogout : '[event] Logout event',
    eventStartAddNew : '[event] Start add new',
    eventAddNew: '[event] Add new',
    //para limpiar el active note
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Events loaded',
    //Auth para el logeo con la bd
    authCheckingFinish : '[auth] Finish Cheking login state',
    authStartLogin : '[auth] Start login',
    authLogin : '[auth] Login',
    authStartRegister : '[auth] Start Register',
    authStartTokenRenew : '[auth] Start token renew',
    authLogout : '[auth] Logout',
}
