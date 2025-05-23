import ow from 'ow';

import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import type { PaginatedList } from '../utils';
import type { ActorEnvironmentVariable } from './actor_version';

export class ActorEnvVarCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/get-list-of-environment-variables
     */
    async list(options: ActorEnvVarCollectionListOptions = {}): Promise<ActorEnvVarListResult> {
        ow(
            options,
            ow.object.exactShape({
                limit: ow.optional.number,
                offset: ow.optional.number,
                desc: ow.optional.boolean,
            }),
        );
        return this._list(options);
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/create-environment-variable
     */
    async create(actorEnvVar: ActorEnvironmentVariable): Promise<ActorEnvironmentVariable> {
        ow(actorEnvVar, ow.optional.object);
        return this._create(actorEnvVar);
    }
}

export interface ActorEnvVarCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
}

export type ActorEnvVarListResult = Pick<PaginatedList<ActorEnvironmentVariable>, 'total' | 'items'>;
