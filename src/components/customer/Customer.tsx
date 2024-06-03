function Customer() {
  return <>Customer</>;
}

export default Customer;

/**
 * // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     CREATE CUSTOMER HOOKS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const {
    globalState: { themeObject },
    globalDispatch,
  } = useGlobalState();

  const { wrappedFetch } = useWrapFetch();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [
    openedSubmitSuccessNotificationModal,
    {
      open: openSubmitSuccessNotificationModal,
      close: closeSubmitSuccessNotificationModal,
    },
  ] = useDisclosure(false);

  const [customerState, customerDispatch] = useReducer(
    customerReducer,
    initialCustomerState
  );

  const {
    username,
    isUsernameFocused,
    isUsernameValid,
    isUsernameExists,

    confirmPassword,
    isConfirmPasswordFocused,
    isConfirmPasswordValid,

    password,
    isPasswordFocused,
    isPasswordValid,

    email,
    isEmailFocused,
    isEmailValid,
    isEmailExists,

    firstName,
    isFirstNameFocused,
    isFirstNameValid,

    middleName,
    isMiddleNameFocused,
    isMiddleNameValid,

    lastName,
    isLastNameFocused,
    isLastNameValid,

    preferredName,
    isPreferredNameFocused,
    isPreferredNameValid,

    preferredPronouns,

    profilePictureUrl,
    isProfilePictureUrlFocused,
    isProfilePictureUrlValid,

    dateOfBirth,
    isDateOfBirthFocused,
    isDateOfBirthValid,

    contactNumber,
    isContactNumberFocused,
    isContactNumberValid,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    ADDRESS
    // ╰─────────────────────────────────────────────────────────────────╯
    addressLine,
    isAddressLineFocused,
    isAddressLineValid,

    city,
    isCityFocused,
    isCityValid,

    province,
    state,

    postalCode,
    isPostalCodeFocused,
    isPostalCodeValid,

    country,

    // ╭─────────────────────────────────────────────────────────────────╮
    //    PAYMENT INFORMATION
    // ╰─────────────────────────────────────────────────────────────────╯
    cardholderName,
    isCardholderNameFocused,
    isCardholderNameValid,

    cardNumber,
    isCardNumberFocused,
    isCardNumberValid,

    expirationDate,
    isExpirationDateFocused,
    isExpirationDateValid,

    cvv,
    isCvvFocused,
    isCvvValid,

    isBillingAddressSameAsShippingAddress,
    billingAddressLine,
    isBillingAddressLineFocused,
    isBillingAddressLineValid,

    billingCity,
    isBillingCityFocused,
    isBillingCityValid,

    billingProvince,
    billingState,

    billingPostalCode,
    isBillingPostalCodeFocused,
    isBillingPostalCodeValid,

    billingCountry,

    isPrefersReducedMotion,

    triggerFormSubmit,
    currentStepperPosition,
    isSubmitting,
    isSuccessful,
    stepsInError,
    submitMessage,
    successMessage,
  } = customerState;

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function customerFormSubmit() {
      customerDispatch({
        type: customerAction.setIsSubmitting,
        payload: true,
      });
      openSubmitSuccessNotificationModal();

      const customerSchema: CustomerSchema = {
        username,
        password,
        email,
        firstName,
        middleName,
        lastName,
        preferredName,
        preferredPronouns,
        profilePictureUrl,
        dateOfBirth,
        contactNumber,
        address: {
          addressLine,
          city,
          province,
          state,
          postalCode,
          country,
        },
        paymentInformation: {
          cardholderName,
          cardNumber,
          expirationDate,
          cvv,
          billingAddress: isBillingAddressSameAsShippingAddress
            ? { addressLine, city, province, state, postalCode, country }
            : {
                addressLine: billingAddressLine,
                city: billingCity,
                province: billingProvince,
                state: billingState,
                postalCode: billingPostalCode,
                country: billingCountry,
              },
        },
        productReviewsIds: [],
        purchaseHistoryIds: [],
        rmaHistoryIds: [],
        isActive: true,
        completedSurveys: [],
        isPrefersReducedMotion,
      };

      const url: URL = urlBuilder({
        path: "customer",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerSchema,
        }),
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: abortControllerRef.current?.signal,
          url,
        });

        const data: ResourceRequestServerResponse<CustomerDocument> =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        customerDispatch({
          type: customerAction.setIsSuccessful,
          payload: true,
        });

        customerDispatch({
          type: customerAction.setSuccessMessage,
          payload: data.message ?? "User created successfully!",
        });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof InvalidTokenError
            ? "Invalid token. Please login again."
            : !error.response
            ? "Network error. Please try again."
            : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/home/customer");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          customerDispatch({
            type: customerAction.setIsSubmitting,
            payload: false,
          });
          customerDispatch({
            type: customerAction.setSubmitMessage,
            payload: "",
          });
          customerDispatch({
            type: customerAction.setTriggerFormSubmit,
            payload: false,
          });
        }
      }
    }

    if (triggerFormSubmit) {
      customerFormSubmit();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFormSubmit]);

  // check username exists on every valid change
  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function handleCheckUsernameExists() {
      customerDispatch({
        type: customerAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: "username-email-set/check",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { username },
        }),
        signal: abortControllerRef.current?.signal,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: abortControllerRef.current?.signal,
          url,
        });

        const data: { status: "error" | "success"; message: string } =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        data.status === "error"
          ? customerDispatch({
              type: customerAction.setIsUsernameExists,
              payload: true,
            })
          : customerDispatch({
              type: customerAction.setIsUsernameExists,
              payload: false,
            });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage = !error.response
          ? "Network error. Please try again."
          : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/customer/create");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          customerDispatch({
            type: customerAction.setIsSubmitting,
            payload: false,
          });
        }
      }
    }

    if (USERNAME_REGEX.test(username) && username.length > 0) {
      handleCheckUsernameExists();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, [username]);

  // check email exists on every valid change
  useEffect(() => {
    let isMounted = true;
    // before submitting form, abort any previous requests
    abortControllerRef.current?.abort();
    // create new abort controller for current request
    abortControllerRef.current = new AbortController();

    async function handleCheckEmailExists() {
      customerDispatch({
        type: customerAction.setIsSubmitting,
        payload: true,
      });

      const url: URL = urlBuilder({
        path: "username-email-set/check",
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { email },
        }),
        signal: abortControllerRef.current?.signal,
      };

      try {
        const response: Response = await wrappedFetch({
          isMounted,
          requestInit,
          signal: abortControllerRef.current?.signal,
          url,
        });

        const data: { status: "error" | "success"; message: string } =
          await response.json();

        if (!isMounted) {
          return;
        }
        if (!response.ok) {
          throw new Error(data.message);
        }

        data.status === "error"
          ? customerDispatch({
              type: customerAction.setIsEmailExists,
              payload: true,
            })
          : customerDispatch({
              type: customerAction.setIsEmailExists,
              payload: false,
            });
      } catch (error: any) {
        if (!isMounted || error.name === "AbortError") {
          return;
        }

        const errorMessage = !error.response
          ? "Network error. Please try again."
          : error?.message ?? "Unknown error occurred. Please try again.";

        globalDispatch({
          type: globalAction.setErrorState,
          payload: {
            isError: true,
            errorMessage,
            errorCallback: () => {
              navigate("/customer/create");

              globalDispatch({
                type: globalAction.setErrorState,
                payload: {
                  isError: false,
                  errorMessage: "",
                  errorCallback: () => {},
                },
              });
            },
          },
        });

        showBoundary(error);
      } finally {
        if (isMounted) {
          customerDispatch({
            type: customerAction.setIsSubmitting,
            payload: false,
          });
        }
      }
    }

    if (EMAIL_REGEX.test(email) && email.length > 0) {
      handleCheckEmailExists();
    }

    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, [email]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     VALIDATION USE EFFECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╭─────────────────────────────────────────────────────────────────╮
  //     USERNAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = USERNAME_REGEX.test(username) && !isUsernameExists;

    customerDispatch({
      type: customerAction.setIsUsernameValid,
      payload: isValid,
    });
  }, [isUsernameExists, username]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = PASSWORD_REGEX.test(password);

    customerDispatch({
      type: customerAction.setIsPasswordValid,
      payload: isValid,
    });
  }, [password]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CONFIRM PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = confirmPassword === password && confirmPassword.length > 0;

    customerDispatch({
      type: customerAction.setIsConfirmPasswordValid,
      payload: isValid,
    });
  }, [confirmPassword, password]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     EMAIL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email) && !isEmailExists;

    customerDispatch({
      type: customerAction.setIsEmailValid,
      payload: isValid,
    });
  }, [email, isEmailExists]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     FIRST NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = NAME_REGEX.test(firstName);

    customerDispatch({
      type: customerAction.setIsFirstNameValid,
      payload: isValid,
    });
  }, [firstName]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     MIDDLE NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = NAME_REGEX.test(middleName);

    customerDispatch({
      type: customerAction.setIsMiddleNameValid,
      payload: isValid,
    });
  }, [middleName]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     LAST NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = NAME_REGEX.test(lastName);

    customerDispatch({
      type: customerAction.setIsLastNameValid,
      payload: isValid,
    });
  }, [lastName]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PREFERRED NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(preferredName);

    customerDispatch({
      type: customerAction.setIsPreferredNameValid,
      payload: isValid,
    });
  }, [preferredName]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PROFILE PICTURE URL
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = URL_REGEX.test(profilePictureUrl);

    customerDispatch({
      type: customerAction.setIsProfilePictureUrlValid,
      payload: isValid,
    });
  }, [profilePictureUrl]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DATE OF BIRTH
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = DATE_OF_BIRTH_REGEX.test(dateOfBirth) && isAgeOver18(dateOfBirth);

    customerDispatch({
      type: customerAction.setIsDateOfBirthValid,
      payload: isValid,
    });
  }, [dateOfBirth]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CONTACT NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValidContact = PHONE_NUMBER_REGEX.test(contactNumber);

    const contactLength = contactNumber.length;
    if (isContactNumberFocused) {
      switch (contactLength) {
        case 4: {
          customerDispatch({
            type: customerAction.setContactNumber,
            payload: `${contactNumber}(`,
          });
          break;
        }
        case 8: {
          customerDispatch({
            type: customerAction.setContactNumber,
            payload: `${contactNumber}) `,
          });
          break;
        }
        case 13: {
          customerDispatch({
            type: customerAction.setContactNumber,
            payload: `${contactNumber}-`,
          });
          break;
        }

        default:
          break;
      }
    }

    customerDispatch({
      type: customerAction.setIsContactNumberValid,
      payload: isValidContact,
    });
  }, [contactNumber, isContactNumberFocused]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = ADDRESS_LINE_REGEX.test(addressLine);

    customerDispatch({
      type: customerAction.setIsAddressLineValid,
      payload: isValid,
    });
  }, [addressLine]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CITY_REGEX.test(city);

    customerDispatch({
      type: customerAction.setIsCityValid,
      payload: isValid,
    });
  }, [city]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid =
      country === "Canada"
        ? POSTAL_CODE_REGEX_CANADA.test(postalCode)
        : POSTAL_CODE_REGEX_US.test(postalCode);

    if (country === "Canada") {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 3) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: `${postalCode} `,
        });
      } else if (postalCodeLength === 7) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: postalCode.trim(),
        });
      }
    } else {
      const postalCodeLength = postalCode.length;
      if (postalCodeLength === 6) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: `${postalCode.slice(0, 5)}-${postalCode.slice(5)}`,
        });
      }
    }
    customerDispatch({
      type: customerAction.setIsPostalCodeValid,
      payload: isValid,
    });
  }, [country, postalCode]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CARDHOLDER NAME
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = FULL_NAME_REGEX.test(cardholderName);

    customerDispatch({
      type: customerAction.setIsCardholderNameValid,
      payload: isValid,
    });
  }, [cardholderName]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CARD NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CREDIT_CARD_NUMBER_REGEX.test(cardNumber);

    const cardNumberLength = cardNumber.length;
    if (cardNumberLength === 4 || cardNumberLength === 9 || cardNumberLength === 14) {
      customerDispatch({
        type: customerAction.setCardNumber,
        payload: `${cardNumber} `,
      });
    }

    customerDispatch({
      type: customerAction.setIsCardNumberValid,
      payload: isValid,
    });
  }, [cardNumber]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     EXPIRATION DATE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isExpirationDateInPast = returnIsExpirationDateInPast(expirationDate);

    const isValid =
      CREDIT_CARD_EXPIRATION_DATE_REGEX.test(expirationDate) && !isExpirationDateInPast;

    customerDispatch({
      type: customerAction.setIsExpirationDateValid,
      payload: isValid,
    });
  }, [expirationDate]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CVV
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CREDIT_CARD_CVV_REGEX.test(cvv);

    customerDispatch({
      type: customerAction.setIsCvvValid,
      payload: isValid,
    });
  }, [cvv]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = ADDRESS_LINE_REGEX.test(billingAddressLine);

    customerDispatch({
      type: customerAction.setIsBillingAddressLineValid,
      payload: isValid,
    });
  }, [billingAddressLine]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING CITY
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValid = CITY_REGEX.test(billingCity);

    customerDispatch({
      type: customerAction.setIsBillingCityValid,
      payload: isValid,
    });
  }, [billingCity]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const isValidPostal =
      billingCountry === "Canada"
        ? POSTAL_CODE_REGEX_CANADA.test(billingPostalCode)
        : POSTAL_CODE_REGEX_US.test(billingPostalCode);

    if (billingCountry === "Canada") {
      const billingPostalCodeLength = billingPostalCode.length;
      if (billingPostalCodeLength === 3) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: `${billingPostalCode} `,
        });
      } else if (billingPostalCodeLength === 7) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: billingPostalCode.trim(),
        });
      }
    } else {
      const billingPostalCodeLength = billingPostalCode.length;
      if (billingPostalCodeLength === 6) {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload: `${billingPostalCode.slice(0, 5)}-${billingPostalCode.slice(5)}`,
        });
      }
    }

    customerDispatch({
      type: customerAction.setIsBillingPostalCodeValid,
      payload: isValidPostal,
    });
  }, [billingCountry, billingPostalCode]);

  // ╔═════════════════════════════════════════════════════════════════╗
  //    STEPPER STATE UPDATE
  // ╚═════════════════════════════════════════════════════════════════╝
  // ╭─────────────────────────────────────────────────────────────────╮
  //     PAGE 1
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const arePage1FieldsInError = [
      isUsernameValid,
      isPasswordValid,
      isConfirmPasswordValid,
      isEmailValid,
      isFirstNameValid,
      isMiddleNameValid,
      isLastNameValid,
      isPreferredNameValid,
      isProfilePictureUrlValid,
      isDateOfBirthValid,
    ].some((isValid) => !isValid);

    customerDispatch({
      type: customerAction.setPageInError,
      payload: {
        kind: arePage1FieldsInError ? "add" : "delete",
        step: 0,
      },
    });
  }, [
    isUsernameValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isEmailValid,
    isFirstNameValid,
    isMiddleNameValid,
    isLastNameValid,
    isPreferredNameValid,
    isProfilePictureUrlValid,
    isDateOfBirthValid,
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PAGE 2
  // ╰─────────────────────────────────────────────────────────────────╯
  useEffect(() => {
    const arePage2FieldsInError = [
      isContactNumberValid,
      isAddressLineValid,
      isCityValid,
      isPostalCodeValid,
      isCardholderNameValid,
      isCardNumberValid,
      isExpirationDateValid,
      isCvvValid,
      isBillingAddressLineValid,
      isBillingCityValid,
      isBillingPostalCodeValid,
    ].some((isValid) => !isValid);

    customerDispatch({
      type: customerAction.setPageInError,
      payload: {
        kind: arePage2FieldsInError ? "add" : "delete",
        step: 1,
      },
    });
  }, [
    isContactNumberValid,
    isAddressLineValid,
    isCityValid,
    isPostalCodeValid,
    isCardholderNameValid,
    isCardNumberValid,
    isExpirationDateValid,
    isCvvValid,
    isBillingAddressLineValid,
    isBillingCityValid,
    isBillingPostalCodeValid,
  ]);

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     INPUT CREATION
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const {
    appThemeColors: { borderColor },
  } = returnThemeColors({ themeObject, colorsSwatches: COLORS_SWATCHES });

  // ╭─────────────────────────────────────────────────────────────────╮
  //     USERNAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [usernameInputErrorText, usernameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "username",
      inputText: username,
      isInputTextFocused: isUsernameFocused,
      isValidInputText: isUsernameValid,
      regexValidationText: `${
        isUsernameExists
          ? "Username already exists. Please choose another."
          : `${returnUsernameRegexValidationText({
              content: username,
              contentKind: "username",
            })}`
      } `,
    });

  // screenreader accessible text input element
  const [createdUsernameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: usernameInputErrorText,
        valid: usernameInputValidText,
      },
      inputText: username,
      isValidInputText: isUsernameValid,
      label: "Username",
      maxLength: 30,
      minLength: 3,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsUsernameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setUsername,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsUsernameFocused,
          payload: true,
        });
      },
      placeholder: "Enter username",
      required: true,
      semanticName: "username",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const passwordRegexValidationText = returnPasswordRegexValidationText({
    content: password,
    contentKind: "password",
  });

  const [passwordInputErrorText, passwordInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "password",
      inputText: password,
      isValidInputText: isPasswordValid,
      isInputTextFocused: isPasswordFocused,
      regexValidationText: `${passwordRegexValidationText}${
        passwordRegexValidationText.includes("special") ? " !, @, #, $, %, ^, &, *" : ""
      }`,
    });

  // screenreader accessible text input element
  const [createdPasswordTextInput] = returnAccessiblePasswordInputElements([
    {
      description: {
        error: passwordInputErrorText,
        valid: passwordInputValidText,
      },
      inputText: password,
      isValidInputText: isPasswordValid,
      label: "Password",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsPasswordFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setPassword,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsPasswordFocused,
          payload: true,
        });
      },
      placeholder: "Enter password",
      required: true,
      semanticName: "password",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CONFIRM PASSWORD
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [confirmPasswordInputErrorText, confirmPasswordInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "confirm password",
      inputText: confirmPassword,
      isInputTextFocused: isConfirmPasswordFocused,
      isValidInputText: isConfirmPasswordValid,
      regexValidationText: "Passwords must match",
    });

  // screenreader accessible text input element
  const [createdConfirmPasswordTextInput] = returnAccessiblePasswordInputElements([
    {
      description: {
        error: confirmPasswordInputErrorText,
        valid: confirmPasswordInputValidText,
      },
      inputText: confirmPassword,
      isValidInputText: isConfirmPasswordValid,
      label: "Confirm Password",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsConfirmPasswordFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setConfirmPassword,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsConfirmPasswordFocused,
          payload: true,
        });
      },
      placeholder: "Confirm password",
      required: true,
      semanticName: "confirm password",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     EMAIL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [emailInputErrorText, emailInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "email",
    inputText: email,
    isInputTextFocused: isEmailFocused,
    isValidInputText: isEmailValid,
    regexValidationText: `${
      isEmailExists
        ? "Email already exists. Please choose another."
        : `${returnEmailValidationText({
            content: email,
            contentKind: "email",
          })}`
    }`,
  });

  // screenreader accessible text input element
  const [createdEmailTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: emailInputErrorText,
        valid: emailInputValidText,
      },
      inputText: email,
      isValidInputText: isEmailValid,
      label: "Email",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsEmailFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setEmail,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsEmailFocused,
          payload: true,
        });
      },
      placeholder: "Enter email",
      required: true,
      semanticName: "email",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     FIRST NAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [firstNameInputErrorText, firstNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "first name",
      inputText: firstName,
      isInputTextFocused: isFirstNameFocused,
      isValidInputText: isFirstNameValid,
      regexValidationText: returnNameValidationText({
        content: firstName,
        contentKind: "first name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdFirstNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: firstNameInputErrorText,
        valid: firstNameInputValidText,
      },
      inputText: firstName,
      isValidInputText: isFirstNameValid,
      label: "First Name",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsFirstNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setFirstName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsFirstNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter first name",
      required: true,
      semanticName: "first name",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     MIDDLE NAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [middleNameInputErrorText, middleNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "middle name",
      inputText: middleName,
      isInputTextFocused: isMiddleNameFocused,
      isValidInputText: isMiddleNameValid,
      regexValidationText: returnNameValidationText({
        content: middleName,
        contentKind: "middle name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdMiddleNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: middleNameInputErrorText,
        valid: middleNameInputValidText,
      },
      inputText: middleName,
      isValidInputText: isMiddleNameValid,
      label: "Middle Name",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsMiddleNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setMiddleName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsMiddleNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter middle name",
      required: true,
      semanticName: "middle name",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     LAST NAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [lastNameInputErrorText, lastNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "last name",
      inputText: lastName,
      isInputTextFocused: isLastNameFocused,
      isValidInputText: isLastNameValid,
      regexValidationText: returnNameValidationText({
        content: lastName,
        contentKind: "last name",
        maxLength: 30,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdLastNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: lastNameInputErrorText,
        valid: lastNameInputValidText,
      },
      inputText: lastName,
      isValidInputText: isLastNameValid,
      label: "Last Name",
      maxLength: 30,
      minLength: 2,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsLastNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setLastName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsLastNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter last name",
      required: true,
      semanticName: "last name",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PREFERRED NAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [preferredNameInputErrorText, preferredNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "preferred name",
      inputText: preferredName,
      isInputTextFocused: isPreferredNameFocused,
      isValidInputText: isPreferredNameValid,
      regexValidationText: returnNameValidationText({
        content: preferredName,
        contentKind: "preferred name",
        maxLength: 100,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdPreferredNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: preferredNameInputErrorText,
        valid: preferredNameInputValidText,
      },
      inputText: preferredName,
      isValidInputText: isPreferredNameValid,
      label: "Preferred Name",
      maxLength: 100,
      minLength: 2,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsPreferredNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setPreferredName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsPreferredNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter preferred name",
      required: true,
      semanticName: "preferred name",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PROFILE PICTURE URL
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [profilePictureUrlInputErrorText, profilePictureUrlInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "profile picture url",
      inputText: profilePictureUrl,
      isInputTextFocused: isProfilePictureUrlFocused,
      isValidInputText: isProfilePictureUrlValid,
      regexValidationText: returnUrlValidationText({
        content: profilePictureUrl,
        contentKind: "profile picture url",
      }),
    });

  // screenreader accessible text input element
  const [createdProfilePictureUrlTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: profilePictureUrlInputErrorText,
        valid: profilePictureUrlInputValidText,
      },
      inputText: profilePictureUrl,
      isValidInputText: isProfilePictureUrlValid,
      label: "Profile Picture URL",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsProfilePictureUrlFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setProfilePictureUrl,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsProfilePictureUrlFocused,
          payload: true,
        });
      },
      placeholder: "Enter profile picture url",
      required: true,
      semanticName: "profile picture url",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DATE OF BIRTH
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const isLegalAdultMessage =
    isAgeOver18(dateOfBirth) || dateOfBirth === ""
      ? ""
      : "You must be 18 years or older to register.";

  const [dateOfBirthInputErrorText, dateOfBirthInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "date of birth",
      inputText: dateOfBirth,
      isInputTextFocused: isDateOfBirthFocused,
      isValidInputText: isDateOfBirthValid,
      regexValidationText: `${isLegalAdultMessage} ${returnDateOfBirthValidationText({
        content: dateOfBirth,
        contentKind: "date of birth",
      })}`,
    });

  // screenreader accessible text input element
  const [createdDateOfBirthTextInput] = returnAccessibleDateTimeElements([
    {
      dateKind: "full date",
      description: {
        error: dateOfBirthInputErrorText,
        valid: dateOfBirthInputValidText,
      },
      inputKind: "date",
      inputText: dateOfBirth,
      isValidInputText: isDateOfBirthValid,
      label: "Date of Birth",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsDateOfBirthFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setDateOfBirth,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsDateOfBirthFocused,
          payload: true,
        });
      },
      placeholder: "Enter date of birth",
      required: true,
      semanticName: "date of birth",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CONTACT NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [contactNumberInputErrorText, contactNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "contact number",
      inputText: contactNumber,
      isInputTextFocused: isContactNumberFocused,
      isValidInputText: isContactNumberValid,
      regexValidationText: returnPhoneNumberValidationText({
        content: contactNumber,
        contentKind: "contact number",
      }),
    });

  // screenreader accessible text input element
  const [createdContactNumberTextInput] = returnAccessiblePhoneNumberTextInputElements([
    {
      description: {
        error: contactNumberInputErrorText,
        valid: contactNumberInputValidText,
      },
      inputText: contactNumber,
      isValidInputText: isContactNumberValid,
      label: "Contact Number",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsContactNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setContactNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsContactNumberFocused,
          payload: true,
        });
      },
      placeholder: "Enter contact number",
      required: true,
      rightSection: true,
      rightSectionOnClick: () => {
        customerDispatch({
          type: customerAction.setContactNumber,
          payload: "+(1)",
        });
      },
      withAsterisk: true,
      semanticName: "contact number",
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
          if (contactNumber.length === 14 || contactNumber.length === 9) {
            customerDispatch({
              type: customerAction.setContactNumber,
              payload: contactNumber.slice(0, -1),
            });
          }
        }
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [addressLineInputErrorText, addressLineInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "address line",
      inputText: addressLine,
      isInputTextFocused: isAddressLineFocused,
      isValidInputText: isAddressLineValid,
      regexValidationText: returnAddressValidationText({
        content: addressLine,
        contentKind: "address line",
      }),
    });

  // screenreader accessible text input element
  const [createdAddressLineTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: addressLineInputErrorText,
        valid: addressLineInputValidText,
      },
      inputText: addressLine,
      isValidInputText: isAddressLineValid,
      label: "Address Line",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsAddressLineFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setAddressLine,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsAddressLineFocused,
          payload: true,
        });
      },
      placeholder: "Enter address line",
      required: true,
      semanticName: "address line",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [cityInputErrorText, cityInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "city",
    inputText: city,
    isInputTextFocused: isCityFocused,
    isValidInputText: isCityValid,
    regexValidationText: returnCityValidationText({
      content: city,
      contentKind: "city",
    }),
  });

  // screenreader accessible text input element
  const [createdCityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cityInputErrorText,
        valid: cityInputValidText,
      },
      inputText: city,
      isValidInputText: isCityValid,
      label: "City",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsCityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setCity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsCityFocused,
          payload: true,
        });
      },
      placeholder: "Enter city",
      required: true,
      semanticName: "city",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PROVINCE / STATE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdProvinceStateSelectInput] = returnAccessibleSelectInputElements([
    {
      data: country === "Canada" ? PROVINCES : STATES_US,
      description: country === "Canada" ? "Select your province" : "Select your state",
      label: country === "Canada" ? "Province" : "State",
      value: country === "Canada" ? province : state,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        country === "Canada"
          ? customerDispatch({
              type: customerAction.setProvince,
              payload: event.currentTarget.value as Province,
            })
          : customerDispatch({
              type: customerAction.setState,
              payload: event.currentTarget.value as StatesUS,
            });
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [postalCodeInputErrorText, postalCodeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "postal code",
      inputText: postalCode,
      isInputTextFocused: isPostalCodeFocused,
      isValidInputText: isPostalCodeValid,
      regexValidationText: returnPostalCodeValidationText({
        postalCode,
        country,
      }),
    });

  // screenreader accessible text input element
  const [createdPostalCodeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: postalCodeInputErrorText,
        valid: postalCodeInputValidText,
      },
      inputText: postalCode,
      isValidInputText: isPostalCodeValid,
      label: "Postal Code",
      maxLength: country === "Canada" ? 7 : 10,
      minLength: country === "Canada" ? 6 : 5,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsPostalCodeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setPostalCode,
          payload:
            country === "Canada"
              ? event.currentTarget.value.toUpperCase()
              : event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsPostalCodeFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        switch (country) {
          case "Canada": {
            if (event.key === "Backspace" && postalCode.length === 4) {
              customerDispatch({
                type: customerAction.setPostalCode,
                payload: postalCode.slice(0, 3),
              });
            }
            break;
          }
          case "United States": {
            if (event.key === "Backspace" && postalCode.length === 7) {
              customerDispatch({
                type: customerAction.setPostalCode,
                payload: postalCode.slice(0, 6),
              });
            }
            break;
          }
          default:
            break;
        }
      },
      placeholder:
        country === "Canada" ? "Enter Canadian postal code" : "Enter US postal code",
      required: true,
      semanticName: "postal code",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     COUNTRY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdCountrySelectInput] = returnAccessibleSelectInputElements([
    {
      description: "Select your country",
      label: "Country",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDispatch({
          type: customerAction.setCountry,
          payload: event.currentTarget.value as Country,
        });
      },
      data: COUNTRIES_DATA,
      value: country,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CARDHOLDER NAME
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [cardholderNameInputErrorText, cardholderNameInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "cardholder name",
      inputText: cardholderName,
      isInputTextFocused: isCardholderNameFocused,
      isValidInputText: isCardholderNameValid,
      regexValidationText: returnNameValidationText({
        content: cardholderName,
        contentKind: "cardholder name",
        maxLength: 100,
        minLength: 2,
      }),
    });

  // screenreader accessible text input element
  const [createdCardholderNameTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cardholderNameInputErrorText,
        valid: cardholderNameInputValidText,
      },
      inputText: cardholderName,
      isValidInputText: isCardholderNameValid,
      label: "Cardholder Name",
      maxLength: 100,
      minLength: 2,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsCardholderNameFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setCardholderName,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsCardholderNameFocused,
          payload: true,
        });
      },
      placeholder: "Enter cardholder name",
      required: true,
      semanticName: "cardholder name",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CARD NUMBER
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [cardNumberInputErrorText, cardNumberInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "card number",
      inputText: cardNumber,
      isInputTextFocused: isCardNumberFocused,
      isValidInputText: isCardNumberValid,
      regexValidationText: returnCreditCardNumberValidationText({
        content: cardNumber,
        contentKind: "card number",
      }),
    });

  // screenreader accessible text input element
  const [createdCardNumberTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cardNumberInputErrorText,
        valid: cardNumberInputValidText,
      },
      inputText: cardNumber,
      isValidInputText: isCardNumberValid,
      label: "Card Number",
      maxLength: 19,
      minLength: 19,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsCardNumberFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setCardNumber,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsCardNumberFocused,
          payload: true,
        });
      },
      placeholder: "Format: 0000 0000 0000 0000",
      required: true,
      semanticName: "card number",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     EXPIRATION DATE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const isExpirationDateInPast = returnIsExpirationDateInPast(expirationDate);

  const [expirationDateInputErrorText, expirationDateInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "expiration date",
      inputText: expirationDate,
      isInputTextFocused: isExpirationDateFocused,
      isValidInputText: isExpirationDateValid,
      regexValidationText: `${
        isExpirationDateInPast ? "Expiration date must be in the future." : ""
      } ${returnCreditCardExpirationDateValidationText({
        content: expirationDate,
        contentKind: "expiration date",
      })}`,
    });

  // screenreader accessible text input element
  const [createdExpirationDateTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: expirationDateInputErrorText,
        valid: expirationDateInputValidText,
      },
      inputText: expirationDate,
      isValidInputText: isExpirationDateValid,
      label: "Expiration Date",
      maxLength: 7,
      minLength: 5,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsExpirationDateFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setExpirationDate,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsExpirationDateFocused,
          payload: true,
        });
      },
      placeholder: "Format: MM/YY or MM/YYYY",
      required: true,
      semanticName: "expiration date",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     CVV
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [cvvInputErrorText, cvvInputValidText] = AccessibleErrorValidTextElements({
    inputElementKind: "cvv",
    inputText: cvv,
    isInputTextFocused: isCvvFocused,
    isValidInputText: isCvvValid,
    regexValidationText: returnCreditCardCvvValidationText({
      content: cvv,
      contentKind: "cvv",
    }),
  });

  // screenreader accessible text input element
  const [createdCvvTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: cvvInputErrorText,
        valid: cvvInputValidText,
      },
      inputText: cvv,
      isValidInputText: isCvvValid,
      label: "CVV",
      maxLength: 4,
      minLength: 3,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsCvvFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setCvv,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsCvvFocused,
          payload: true,
        });
      },
      placeholder: "Format: 000 or 0000",
      required: true,
      semanticName: "cvv",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING ADDRESS SAME AS SHIPPING ADDRESS
  // ╰─────────────────────────────────────────────────────────────────╯

  // selected/deselected text elements
  const [
    billingAddressSameAsShippingAddressInputSelectedText,
    billingAddressSameAsShippingAddressInputDeselectedText,
  ] = AccessibleSelectedDeselectedTextElements({
    isSelected: isBillingAddressSameAsShippingAddress,
    semanticName: "billing address same as shipping address",
    selectedDescription: "Billing address is the same as shipping address",
    deselectedDescription: "Billing address is not the same as shipping address",
    theme: "muted",
  });

  // screenreader accessible checkbox input element
  const [createdBillingAddressSameAsShippingAddressCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      {
        description: {
          selected: billingAddressSameAsShippingAddressInputSelectedText,
          deselected: billingAddressSameAsShippingAddressInputDeselectedText,
        },
        label: "",
        onChange: (_event: ChangeEvent<HTMLInputElement>) => {
          customerDispatch({
            type: customerAction.setIsBillingAddressSameAsShippingAddress,
            payload: isBillingAddressSameAsShippingAddress ? false : true,
          });
        },
        checked: isBillingAddressSameAsShippingAddress,
        semanticName: "billing address same as shipping address",
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING ADDRESS LINE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [billingAddressLineInputErrorText, billingAddressLineInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "billing address line",
      inputText: billingAddressLine,
      isInputTextFocused: isBillingAddressLineFocused,
      isValidInputText: isBillingAddressLineValid,
      regexValidationText: returnAddressValidationText({
        content: billingAddressLine,
        contentKind: "billing address line",
      }),
    });

  // screenreader accessible text input element
  const [createdBillingAddressLineTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: billingAddressLineInputErrorText,
        valid: billingAddressLineInputValidText,
      },
      inputText: billingAddressLine,
      isValidInputText: isBillingAddressLineValid,
      label: "Address Line",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsBillingAddressLineFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setBillingAddressLine,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsBillingAddressLineFocused,
          payload: true,
        });
      },
      placeholder: "Enter billing address line",
      required: true,
      semanticName: "billing address line",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING CITY
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [billingCityInputErrorText, billingCityInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "billing city",
      inputText: billingCity,
      isInputTextFocused: isBillingCityFocused,
      isValidInputText: isBillingCityValid,
      regexValidationText: returnCityValidationText({
        content: billingCity,
        contentKind: "billing city",
      }),
    });

  // screenreader accessible text input element
  const [createdBillingCityTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: billingCityInputErrorText,
        valid: billingCityInputValidText,
      },
      inputText: billingCity,
      isValidInputText: isBillingCityValid,
      label: "City",
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsBillingCityFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setBillingCity,
          payload: event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsBillingCityFocused,
          payload: true,
        });
      },
      placeholder: "Enter billing city",
      required: true,
      semanticName: "billing city",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING PROVINCE / STATE
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdBillingProvinceStateSelectInput] = returnAccessibleSelectInputElements([
    {
      data: billingCountry === "Canada" ? PROVINCES : STATES_US,
      description:
        billingCountry === "Canada" ? "Select your province" : "Select your state",
      label: billingCountry === "Canada" ? "Province" : "State",
      value: billingCountry === "Canada" ? billingProvince : billingState,
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        billingCountry === "Canada"
          ? customerDispatch({
              type: customerAction.setBillingProvince,
              payload: event.currentTarget.value as Province,
            })
          : customerDispatch({
              type: customerAction.setBillingState,
              payload: event.currentTarget.value as StatesUS,
            });
      },
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING POSTAL CODE
  // ╰─────────────────────────────────────────────────────────────────╯

  // error/valid text elements
  const [billingPostalCodeInputErrorText, billingPostalCodeInputValidText] =
    AccessibleErrorValidTextElements({
      inputElementKind: "billing postal code",
      inputText: billingPostalCode,
      isInputTextFocused: isBillingPostalCodeFocused,
      isValidInputText: isBillingPostalCodeValid,
      regexValidationText: returnPostalCodeValidationText({
        postalCode: billingPostalCode,
        country: billingCountry,
      }),
    });

  // screenreader accessible text input element
  const [createdBillingPostalCodeTextInput] = returnAccessibleTextInputElements([
    {
      description: {
        error: billingPostalCodeInputErrorText,
        valid: billingPostalCodeInputValidText,
      },
      inputText: billingPostalCode,
      isValidInputText: isBillingPostalCodeValid,
      label: "Postal Code",
      maxLength: billingCountry === "Canada" ? 7 : 10,
      minLength: billingCountry === "Canada" ? 6 : 5,
      onBlur: () => {
        customerDispatch({
          type: customerAction.setIsBillingPostalCodeFocused,
          payload: false,
        });
      },
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        customerDispatch({
          type: customerAction.setBillingPostalCode,
          payload:
            billingCountry === "Canada"
              ? event.currentTarget.value.toUpperCase()
              : event.currentTarget.value,
        });
      },
      onFocus: () => {
        customerDispatch({
          type: customerAction.setIsBillingPostalCodeFocused,
          payload: true,
        });
      },
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        switch (billingCountry) {
          case "Canada": {
            if (event.key === "Backspace" && billingPostalCode.length === 4) {
              customerDispatch({
                type: customerAction.setBillingPostalCode,
                payload: billingPostalCode.slice(0, 3),
              });
            }
            break;
          }
          case "United States": {
            if (event.key === "Backspace" && billingPostalCode.length === 7) {
              customerDispatch({
                type: customerAction.setBillingPostalCode,
                payload: billingPostalCode.slice(0, 6),
              });
            }
            break;
          }
          default:
            break;
        }
      },
      placeholder:
        billingCountry === "Canada"
          ? "Enter Canadian postal code"
          : "Enter US postal code",
      required: true,
      semanticName: "billing postal code",
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     BILLING COUNTRY
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdBillingCountrySelectInput] = returnAccessibleSelectInputElements([
    {
      description: "Select your country",
      label: "Country",
      onChange: (event: ChangeEvent<HTMLSelectElement>) => {
        customerDispatch({
          type: customerAction.setBillingCountry,
          payload: event.currentTarget.value as Country,
        });
      },
      data: COUNTRIES_DATA,
      value: billingCountry,
      required: true,
    },
  ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     PREFERS REDUCED MOTION
  // ╰─────────────────────────────────────────────────────────────────╯

  // selected/deselected text elements
  const [prefersReducedMotionInputSelectedText, prefersReducedMotionInputDeselectedText] =
    AccessibleSelectedDeselectedTextElements({
      isSelected: isPrefersReducedMotion,
      semanticName: "toggle animation",
      selectedDescription: "You have chosen: Animation OFF",
      deselectedDescription: "Please select your preference (default: Animation ON)",
      theme: "muted",
    });

  // screenreader accessible checkbox input element
  const [createdPrefersReducedMotionCheckboxInput] =
    returnAccessibleCheckboxSingleInputElements([
      {
        description: {
          selected: prefersReducedMotionInputSelectedText,
          deselected: prefersReducedMotionInputDeselectedText,
        },
        label: "Toggle Animation",
        onChange: (_event: ChangeEvent<HTMLInputElement>) => {
          customerDispatch({
            type: customerAction.setIsPrefersReducedMotion,
            payload: isPrefersReducedMotion ? false : true,
          });
        },
        checked: isPrefersReducedMotion,
        semanticName: "toggle animation",
        required: true,
      },
    ]);

  // ╭─────────────────────────────────────────────────────────────────╮
  //     SUBMIT FORM BUTTON
  // ╰─────────────────────────────────────────────────────────────────╯
  const [createdSubmitButton] = returnAccessibleButtonElements([
    {
      buttonLabel: "Submit",
      buttonOnClick: (event: MouseEvent<HTMLButtonElement>) => {
        customerDispatch({
          type: customerAction.setTriggerFormSubmit,
          payload: true,
        });
      },
      buttonDisabled: stepsInError.size > 0 || triggerFormSubmit,
      leftIcon: <TbUpload />,
      semanticDescription: "create product form submit button",
      semanticName: "submit button",
    },
  ]);

  const createdSubmitButtonWithTooltip =
    currentStepperPosition === CREATE_CUSTOMER_MAX_STEPPER_POSITION ? (
      <Tooltip
        label={
          stepsInError.size > 0
            ? "Please fix errors before submitting form."
            : "Submit create product form"
        }
      >
        <Group w="100%" position="center">
          {createdSubmitButton}
        </Group>
      </Tooltip>
    ) : null;

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //     INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  const displayCustomerFormPage1 = (
    <FormLayoutWrapper>
      {createdUsernameTextInput}
      {createdEmailTextInput}
      {createdPasswordTextInput}
      {createdConfirmPasswordTextInput}
      {createdFirstNameTextInput}
      {createdMiddleNameTextInput}
      {createdLastNameTextInput}
      {createdPreferredNameTextInput}
      {createdProfilePictureUrlTextInput}
      {createdDateOfBirthTextInput}
      {createdPrefersReducedMotionCheckboxInput}
    </FormLayoutWrapper>
  );

  const displayCustomerFormPage2 = (
    <FormLayoutWrapper>
      {createdContactNumberTextInput}

      <Space h="xl" />

      <Stack w="100%">
        <Title order={4}>Home Address</Title>
        <Group w="100%" position="apart">
          {createdAddressLineTextInput}
          {createdCityTextInput}
          {createdProvinceStateSelectInput}
          {createdPostalCodeTextInput}
          {createdCountrySelectInput}
        </Group>
      </Stack>

      <Space h="xl" />

      <Stack w="100%">
        <Title order={4}>Payment Information</Title>
        <Group w="100%" position="apart">
          {createdCardholderNameTextInput}
          {createdCardNumberTextInput}
          {createdExpirationDateTextInput}
          {createdCvvTextInput}
        </Group>

        <Space h="lg" />

        <Title order={4}>Billing Address</Title>
        {createdBillingAddressSameAsShippingAddressCheckboxInput}
        {isBillingAddressSameAsShippingAddress ? null : (
          <Group w="100%" position="apart">
            {createdBillingAddressLineTextInput}
            {createdBillingCityTextInput}
            {createdBillingProvinceStateSelectInput}
            {createdBillingPostalCodeTextInput}
            {createdBillingCountrySelectInput}
          </Group>
        )}
      </Stack>
    </FormLayoutWrapper>
  );

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    FORM REVIEW OBJECTS
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // - used to display the input values in the form review page of the Stepper component
  // - inputs whose values are in error are highlighted in red
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 1
  // ╚═════════════════════════════════════════════════════════════════╝

  const page1FormReviewObject: FormReviewObjectArray = {
    "Customer Personal": [
      {
        inputName: "Username",
        inputValue: username,
        isInputValueValid: isUsernameValid,
      },
      {
        inputName: "Email",
        inputValue: email,
        isInputValueValid: isEmailValid,
      },
      {
        inputName: "Password",
        inputValue: password,
        isInputValueValid: isPasswordValid,
      },
      {
        inputName: "Confirm Password",
        inputValue: confirmPassword,
        isInputValueValid: isConfirmPasswordValid,
      },
      {
        inputName: "First Name",
        inputValue: firstName,
        isInputValueValid: isFirstNameValid,
      },
      {
        inputName: "Middle Name",
        inputValue: middleName,
        isInputValueValid: isMiddleNameValid,
      },
      {
        inputName: "Last Name",
        inputValue: lastName,
        isInputValueValid: isLastNameValid,
      },
      {
        inputName: "Preferred Name",
        inputValue: preferredName,
        isInputValueValid: isPreferredNameValid,
      },
      {
        inputName: "Profile Picture URL",
        inputValue: profilePictureUrl,
        isInputValueValid: isProfilePictureUrlValid,
      },
      {
        inputName: "Date of Birth",
        inputValue: dateOfBirth,
        isInputValueValid: isDateOfBirthValid,
      },
    ],
  };

  // ╔═════════════════════════════════════════════════════════════════╗
  //    PAGE 2
  // ╚═════════════════════════════════════════════════════════════════╝

  const page2FormReviewObject: FormReviewObjectArray = {
    "Customer Contact Details": [
      {
        inputName: "Contact Number",
        inputValue: contactNumber,
        isInputValueValid: isContactNumberValid,
      },
      {
        inputName: "Address Line",
        inputValue: addressLine,
        isInputValueValid: isAddressLineValid,
      },
      {
        inputName: "City",
        inputValue: city,
        isInputValueValid: isCityValid,
      },
      {
        inputName: "Province",
        inputValue: province,
      },
      {
        inputName: "Postal Code",
        inputValue: postalCode,
        isInputValueValid: isPostalCodeValid,
      },
      {
        inputName: "Country",
        inputValue: country,
      },
      {
        inputName: "Cardholder Name",
        inputValue: cardholderName,
        isInputValueValid: isCardholderNameValid,
      },
      {
        inputName: "Card Number",
        inputValue: cardNumber,
        isInputValueValid: isCardNumberValid,
      },
      {
        inputName: "Expiration Date",
        inputValue: expirationDate,
        isInputValueValid: isExpirationDateValid,
      },
      {
        inputName: "CVV",
        inputValue: cvv,
        isInputValueValid: isCvvValid,
      },
      {
        inputName: "Billing Address Line",
        inputValue: billingAddressLine,
        isInputValueValid: isBillingAddressLineValid,
      },
      {
        inputName: "Billing City",
        inputValue: billingCity,
        isInputValueValid: isBillingCityValid,
      },
      {
        inputName: "Billing Province",
        inputValue: billingProvince,
      },
      {
        inputName: "Billing Postal Code",
        inputValue: billingPostalCode,
        isInputValueValid: isBillingPostalCodeValid,
      },
      {
        inputName: "Billing Country",
        inputValue: billingCountry,
      },
      {
        inputName: "Prefers Reduced Motion",
        inputValue: isPrefersReducedMotion ? "Yes" : "No",
      },
    ],
  };

  const CREATE_CUSTOMER_FORM_REVIEW_OBJECTS: FormReviewObjectArray = {
    ...page1FormReviewObject,
    ...page2FormReviewObject,
  };

  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  const displayCustomerReviewPage = (
    <FormReviewPage
      formReviewObject={CREATE_CUSTOMER_FORM_REVIEW_OBJECTS}
      formName="Create Customer"
    />
  );

  const displaySubmitSuccessNotificationModal = (
    <NotificationModal
      onCloseCallbacks={[
        closeSubmitSuccessNotificationModal,
        () => {
          navigate("/home/customer/display");
        },
      ]}
      opened={openedSubmitSuccessNotificationModal}
      notificationProps={{
        loading: isSubmitting,
        text: isSubmitting ? submitMessage : successMessage,
      }}
      title={<Title order={4}>{isSuccessful ? "Success!" : "Submitting ..."}</Title>}
    />
  );

  const displayCustomerForm =
    currentStepperPosition === 0
      ? displayCustomerFormPage1
      : currentStepperPosition === 1
      ? displayCustomerFormPage2
      : currentStepperPosition === 2
      ? displayCustomerReviewPage
      : createdSubmitButtonWithTooltip;

  const displayCustomerComponent = (
    <StepperWrapper
      currentStepperPosition={currentStepperPosition}
      descriptionObjectsArray={CREATE_CUSTOMER_DESCRIPTION_OBJECTS}
      maxStepperPosition={CREATE_CUSTOMER_MAX_STEPPER_POSITION}
      setCurrentStepperPosition={customerAction.setCurrentStepperPosition}
      stepsInError={stepsInError}
      parentComponentDispatch={customerDispatch}
      childrenTitle="Create Customer"
    >
      {displaySubmitSuccessNotificationModal}
      {displayCustomerForm}
    </StepperWrapper>
  );

  return displayCustomerComponent;
 */
