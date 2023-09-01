import { OptionActionType } from 'src/app/modals/error-modal/error-modal.component';

export const UserNotFoundError = {
  title: 'Email not registed',
  message:
    'It seems the email provided is incorrect - are you sure this is correct (including spelling)?',
  options: [
    {
      description: "Yes, I'm sure",
      action: {
        type: OptionActionType.EmitError,
      },
    },
    {
      description: 'No, let me re-enter',
      action: { type: OptionActionType.Close },
    },
  ],
};

export const RegistrationAsUserFirstError = {
  title: 'Registration required',
  message:
    'In order to obtain admin rights - you will first need to register as\
     a standard user and then request admin right, which are granted at\
     disgrestion of those able to do so',
  options: [
    {
      description: "Cool let's do that",
      action: { type: OptionActionType.Navigate },
    },
  ],
};
