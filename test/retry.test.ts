import { describe, it, expect } from "vitest";
import { retry } from "../lib";

const options = { retries: 5, retryIntervalMs: 200 }

describe('Async Retry Fail', () => {
    it('will fail', () => {

        expect(async () => retry(async () => {
            throw Error('Fail')
        }, options))
        .rejects
        .toThrowError(/Fail/)
    })
})

describe('Async Retry', () => {
    it('will complete', () => {

        let count = 0
        expect(async () => retry(async () => {
            if (count === 3) {
                return true
            } else {
                throw Error('Fail')
            }
        }, options))
        .toBeTruthy()
    })
})