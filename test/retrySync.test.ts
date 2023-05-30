import { describe, it, expect } from "vitest";
import { retrySync } from "../lib";

const options = { retries: 5, retryIntervalMs: 200 }

describe('Sync Retry Fail', () => {
    it('will fail', () => {

        expect(() => retrySync(() => {
            throw Error('Fail')
        }, options))
        .toThrowError(/retry/)
    })
})

describe('Sync Retry', () => {
    it('will complete', () => {

        let count = 0
        expect(() => retrySync(() => {
            if (count === 3) {
                return true
            } else {
                throw Error('Fail')
            }
        }, options))
        .toBeTruthy()
    })
})