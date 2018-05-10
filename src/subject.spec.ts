import {expect} from 'chai';
import {Subject} from "./subject";

describe('sample test-suite', () => {

    it('should make object instance', () => {
        expect(new Subject()).to.be.an('Object');
    });

    it('should return initial value', () => {
        let subject = new Subject();
        expect(subject.getLast()).to.be.null;
        subject = new Subject(123);
        expect(subject.getLast()).eq(123);
    });

    it('should keep last value', () => {
        let subject = new Subject(123);
        subject.next({'key': 'value'});
        expect(subject.getLast()).deep.equal({'key': 'value'});
    });

    it('should emit value to all subscribers', () => {
        let subject = new Subject(123);

        let output = null;
        let output2 = null;

        subject.subscribe((value: any) => {
            output = value;
        });

        subject.subscribe((value: any) => {
            output2 = value;
        });

        subject.next(123);
        expect(output).eq(123);
        expect(output).eq(123);

        subject.next(345);
        expect(output).eq(345);
        expect(output).eq(345);
    });

    it('test nextUnique() method', () => {
        let subject = new Subject(123);
        let output = null;
        subject.subscribe((value: any) => {
            output = value;
        });

        subject.nextUnique(123);
        expect(output).to.be.null;

        subject.nextUnique(345);
        expect(output).eq(345);
    });

    it('test replayAndSubscribe() method', () => {
        let subject = new Subject(123);
        let output = [];

        subject.next(1).next(2).next(3);

        subject.replayAndSubscribe((value: any) => {
            output.push(value);
        });

        expect(output).deep.equal([1, 2, 3]);
    });

    it('should remove listener', () => {
        let subject = new Subject();
        let output = [];

        let observer = subject.subscribe((value: any) => {
            output.push(value);
        });

        subject.next(1).next(2);
        observer.unsubscribe();
        subject.next(3);
        expect(output).deep.equal([1, 2]);
    });

    it('should accept empty data', () => {
        let subject = new Subject();
        let output = [];
        let count = 0;

        subject.subscribe((value: any) => {
            count++;
            output.push(value);
        });

        subject.next().next().next({'key': 'value'});
        expect(count).eq(3);
        expect(output).deep.equal([undefined, undefined, {'key': 'value'}]);
    });

});