//
// This source file is part of the Stanford SSO Testing Ground project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { beforeUserCreated } from 'firebase-functions/v2/identity'

export const beforeUserCreatedFunction = beforeUserCreated(async (event) => {
    console.log("beforeUserCreated with event:", JSON.stringify(event));
    console.log("beforeUserCreated with email:", event.data?.email);
    console.log("beforeUserCreated with providerId:", event.credential?.providerId);
    const allowedProviderIds = ["google.com", "facebook.com"];
    if (!allowedProviderIds.includes(event.credential?.providerId ?? "")) {
        throw new Error("Provider not allowed");
    }
});