import ow from 'ow';

import { ACT_JOB_STATUSES } from '@apify/consts';

import type { ApiClientOptionsWithOptionalResourcePath } from '../base/api_client';
import { ResourceCollectionClient } from '../base/resource_collection_client';
import type { PaginatedList } from '../utils';
import type { ActorRunListItem } from './actor';

export class RunCollectionClient extends ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientOptionsWithOptionalResourcePath) {
        super({
            resourcePath: 'runs',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/get-list-of-runs
     */
    async list(options: RunCollectionListOptions = {}): Promise<PaginatedList<ActorRunListItem>> {
        ow(
            options,
            ow.object.exactShape({
                limit: ow.optional.number,
                offset: ow.optional.number,
                desc: ow.optional.boolean,
                status: ow.optional.string.oneOf(Object.values(ACT_JOB_STATUSES)),
            }),
        );

        return this._list(options);
    }
}

export interface RunCollectionListOptions {
    limit?: number;
    offset?: number;
    desc?: boolean;
    status?: (typeof ACT_JOB_STATUSES)[keyof typeof ACT_JOB_STATUSES];
}
