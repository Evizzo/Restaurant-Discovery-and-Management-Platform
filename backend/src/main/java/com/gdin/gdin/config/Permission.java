package com.gdin.gdin.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),

    SPOT_OWNER_READ("spot_owner:read"),
    SPOT_OWNER_UPDATE("spot_owner:update"),
    SPOT_OWNER_CREATE("spot_owner:create"),
    SPOT_OWNER_DELETE("spot_owner:delete"),

    WORKER_READ("worker:read"),
    WORKER_UPDATE("worker:update"),
    WORKER_CREATE("worker:create"),
    WORKER_DELETE("worker:delete");

    @Getter
    private final String permission;
}