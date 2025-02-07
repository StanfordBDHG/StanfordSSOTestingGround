//
// This source file is part of the Stanford SSO Testing Ground project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { logger } from 'firebase-functions/v2';
import { beforeUserCreated } from 'firebase-functions/v2/identity'

export const beforeUserCreatedFunction = beforeUserCreated(async (event) => {
    logger.info(event.data?.uid, "event:", JSON.stringify(event));
    logger.info(event.data?.uid, "email:", event.data?.email);
    logger.info(event.data?.uid, "providerId:", event.credential?.providerId);
    if (event.data?.email === undefined) {
        logger.error(event.data?.uid, "Email address is required for user.")
        throw new Error("Email address is required for user.");
    }
    const allowedProviderIds = ["oidc.stanford", "oidc.johnshopkins", "oidc.michigan"];
    if (!allowedProviderIds.includes(event.credential?.providerId ?? "")) {
        logger.error(event.data?.uid, "SSO Provider is not allowed.")
        throw new Error("Provider not allowed");
    }
});