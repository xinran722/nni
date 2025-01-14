// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

'use strict';

const joi = require('joi');

export namespace ValidationSchemas {
    export const SETCLUSTERMETADATA = {
        body: {
            machine_list: joi.array().items(joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                username: joi.string().required(),
                ip: joi.string().hostname().required(),
                port: joi.number().min(1).max(65535).required(),
                passwd: joi.string(),
                sshKeyPath: joi.string(),
                passphrase: joi.string(),
                gpuIndices: joi.string(),
                maxTrialNumPerGpu: joi.number(),
                useActiveGpu: joi.boolean(),
                pythonPath: joi.string()
            })),
            local_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                gpuIndices: joi.string(),
                maxTrialNumPerGpu: joi.number(),
                useActiveGpu: joi.boolean(),
                reuse: joi.boolean()
            }),
            trial_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                image: joi.string().min(1),
                codeDir: joi.string().min(1).required(),
                dataDir: joi.string(),
                outputDir: joi.string(),
                cpuNum: joi.number().min(1),
                memoryMB: joi.number().min(100),
                // ############## adl cpu and memory config ###############
                memorySize: joi.string(),
                // ########################################################
                gpuNum: joi.number().min(0),
                command: joi.string().min(1),
                virtualCluster: joi.string(),
                shmMB: joi.number(),
                authFile: joi.string(),
                nniManagerNFSMountPath: joi.string().min(1),
                containerNFSMountPath: joi.string().min(1),
                paiConfigPath: joi.string(),
                nodeCount: joi.number(),
                paiStorageConfigName: joi.string().min(1),
                nasMode: joi.string().valid('classic_mode', 'enas_mode', 'oneshot_mode', 'darts_mode'),
                portList: joi.array().items(joi.object({
                    label: joi.string().required(),
                    beginAt: joi.number().required(),
                    portNumber: joi.number().required(),
                })),
                worker: joi.object({
                    replicas: joi.number().min(1).required(),
                    image: joi.string().min(1),
                    privateRegistryAuthPath: joi.string().min(1),
                    outputDir: joi.string(),
                    cpuNum: joi.number().min(1),
                    memoryMB: joi.number().min(100),
                    gpuNum: joi.number().min(0).required(),
                    command: joi.string().min(1).required()
                }),
                ps: joi.object({
                    replicas: joi.number().min(1).required(),
                    image: joi.string().min(1),
                    privateRegistryAuthPath: joi.string().min(1),
                    outputDir: joi.string(),
                    cpuNum: joi.number().min(1),
                    memoryMB: joi.number().min(100),
                    gpuNum: joi.number().min(0).required(),
                    command: joi.string().min(1).required()
                }),
                master: joi.object({
                    replicas: joi.number().min(1).required(),
                    image: joi.string().min(1),
                    privateRegistryAuthPath: joi.string().min(1),
                    outputDir: joi.string(),
                    cpuNum: joi.number().min(1),
                    memoryMB: joi.number().min(100),
                    gpuNum: joi.number().min(0).required(),
                    command: joi.string().min(1).required()
                }),
                taskRoles: joi.array().items({
                    name: joi.string().min(1),
                    taskNum: joi.number().min(1).required(),
                    image: joi.string().min(1),
                    privateRegistryAuthPath: joi.string().min(1),
                    outputDir: joi.string(),
                    cpuNum: joi.number().min(1),
                    memoryMB: joi.number().min(100),
                    shmMB: joi.number(),
                    gpuNum: joi.number().min(0).required(),
                    command: joi.string().min(1).required(),
                    frameworkAttemptCompletionPolicy: joi.object({
                        minFailedTaskCount: joi.number(),
                        minSucceededTaskCount: joi.number()
                    })
                }),
                imagePullSecrets: joi.array().items({
                    name: joi.string().min(1).required()
                }),
                // ############## adl ###############
                namespace: joi.string(),
                adaptive: joi.boolean(),
                checkpoint: joi.object({
                    storageClass: joi.string().min(1).required(),
                    storageSize: joi.string().min(1).required()
                }),
                nfs: joi.object({
                    server: joi.string().min(1).required(),
                    path: joi.string().min(1).required(),
                    containerMountPath: joi.string().min(1).required()
                })
            }),
            pai_yarn_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                userName: joi.string().min(1).required(),
                passWord: joi.string().min(1),
                token: joi.string().min(1),
                host: joi.string().min(1).required()
            }),
            pai_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                userName: joi.string().min(1).required(),
                token: joi.string().min(1),
                host: joi.string().min(1).required(),
                reuse: joi.boolean(),
                cpuNum: joi.number().min(1),
                memoryMB: joi.number().min(100),
                gpuNum: joi.number().min(1),
                maxTrialNumPerGpu: joi.number(),
                useActiveGpu: joi.boolean(),
            }),
            adl_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                // hack for v2 configuration
            }),
            kubeflow_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                operator: joi.string().min(1).required(),
                storage: joi.string().min(1),
                apiVersion: joi.string().min(1),
                nfs: joi.object({
                    server: joi.string().min(1).required(),
                    path: joi.string().min(1).required()
                }),
                keyVault: joi.object({
                    vaultName: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){1,127}$/),
                    name: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){1,127}$/)
                }),
                azureStorage: joi.object({
                    accountName: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){3,31}$/),
                    azureShare: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){3,63}$/)
                }),
                uploadRetryCount: joi.number().min(1)
            }),
            frameworkcontroller_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                storage: joi.string().min(1),
                serviceAccountName: joi.string().min(1),
                pvc: joi.object({
                    path: joi.string().min(1).required()
                }),
                configPath: joi.string().min(1),
                nfs: joi.object({
                    server: joi.string().min(1).required(),
                    path: joi.string().min(1).required()
                }),
                keyVault: joi.object({
                    vaultName: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){1,127}$/),
                    name: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){1,127}$/)
                }),
                azureStorage: joi.object({
                    accountName: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){3,31}$/),
                    azureShare: joi.string().regex(/^([0-9]|[a-z]|[A-Z]|-){3,63}$/)
                }),
                uploadRetryCount: joi.number().min(1),
                namespace: joi.string().min(1)
            }),
            dlts_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                dashboard: joi.string().min(1),

                cluster: joi.string().min(1),
                team: joi.string().min(1),

                email: joi.string().min(1),
                password: joi.string().min(1)
            }),
            aml_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                subscriptionId: joi.string().min(1),
                resourceGroup: joi.string().min(1),
                workspaceName: joi.string().min(1),
                computeTarget: joi.string().min(1),
                maxTrialNumPerGpu: joi.number(),
                useActiveGpu: joi.boolean()
            }),
            hybrid_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                trainingServicePlatforms: joi.array(),
            }),
            nni_manager_ip: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                nniManagerIp: joi.string().min(1)
            }),
            version_check: joi.boolean(), // eslint-disable-line @typescript-eslint/camelcase
            log_collection: joi.string(), // eslint-disable-line @typescript-eslint/camelcase
            remote_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                reuse: joi.boolean()
            }),
            shared_storage_config: joi.object({ // eslint-disable-line @typescript-eslint/camelcase
                storageType: joi.string(),
                localMountPoint: joi.string(),
                remoteMountPoint: joi.string(),
                nfsServer: joi.string(),
                exportedDirectory: joi.string(),
                storageAccountName: joi.string(),
                storageAccountKey: joi.string(),
                containerName: joi.string(),
                resourceGroupName: joi.string(),
                localMounted: joi.string()
            })
        }
    };
    export const STARTEXPERIMENT = {
        body: {
            experimentName: joi.string().required(),
            description: joi.string(),
            authorName: joi.string(),
            maxTrialNum: joi.number().min(0).required(),
            trialConcurrency: joi.number().min(0).required(),
            trainingServicePlatform: joi.string(),
            searchSpace: joi.string().required(),
            maxExecDuration: joi.number().min(0).required(),
            maxTrialDuration: joi.number().min(0).required(),
            multiPhase: joi.boolean(),
            multiThread: joi.boolean(),
            nniManagerIp: joi.string(),
            versionCheck: joi.boolean(),
            logCollection: joi.string(),
            advisor: joi.object({
                builtinAdvisorName: joi.string(),
                codeDir: joi.string(),
                classFileName: joi.string(),
                className: joi.string(),
                classArgs: joi.any(),
                checkpointDir: joi.string().allow(''),
                gpuIndices: joi.string()
            }),
            tuner: joi.object({
                builtinTunerName: joi.string(),
                codeDir: joi.string(),
                classFileName: joi.string(),
                className: joi.string(),
                classArgs: joi.any(),
                checkpointDir: joi.string().allow(''),
                includeIntermediateResults: joi.boolean(),
                gpuIndices: joi.string()
            }),
            assessor: joi.object({
                builtinAssessorName: joi.string(),
                codeDir: joi.string(),
                classFileName: joi.string(),
                className: joi.string(),
                classArgs: joi.any(),
                checkpointDir: joi.string().allow('')
            }),
            clusterMetaData: joi.array().items(joi.object({
                key: joi.string(),
                value: joi.any()
            }))
        }
    };
    export const UPDATEEXPERIMENT = {
        query: {
            /* eslint-disable-next-line @typescript-eslint/camelcase */
            update_type: joi.string().required().valid('TRIAL_CONCURRENCY', 'MAX_EXEC_DURATION', 'SEARCH_SPACE', 'MAX_TRIAL_NUM')
        },
        body: {
            id: joi.string().required(),
            revision: joi.number().min(0).required(),
            params: joi.object(STARTEXPERIMENT.body),
            execDuration: joi.number().required(),
            startTime: joi.number(),
            endTime: joi.number(),
            logDir: joi.string(),
            nextSequenceId: joi.number()
        }
    };
}
